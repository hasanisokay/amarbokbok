/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { hostname } from '@/constants/hostname.mjs';
import getTimeWithHours from '@/utils/getTimeWithHours.mjs';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTable } from 'react-table';

const CommentTable = ({ comments }) => {
  const data = React.useMemo(() => comments, [comments]);

  const initialExpandedRows = React.useMemo(() => {
    const expanded = {};
    comments.forEach(comment => {
      if (comment.replies && comment.replies.length > 0) {
        expanded[comment._id] = true;
      }
    });
    return expanded;
  }, [comments]);

  const [expandedRows, setExpandedRows] = useState(initialExpandedRows);

  const columns = React.useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <span className={`${value === "approved" ? "text-green-500" : "text-yellow-500"}`}>{value}</span>
      )
    },
    {
      Header: 'Comment',
      accessor: 'comment',
      Cell: ({ value }) => (
        <span className='max-w-[300px] h-auto'>{value}</span>
      )
    },
    {
      Header: 'Ip',
      accessor: 'ip',
    },
    {
      Header: 'Blog',
      accessor: 'blog_id',
      Cell: ({ value }) => (
        // <span onClick={() => router.push()} style={{ color: 'blue', cursor: "pointer" }}>{value}</span>
        <Link href={`/blogs/${value}`} className='text-blue-500'>{value}</Link>
      )
    },
    {
      Header: 'Date',
      accessor: 'submittedOn',
      Cell: ({ value }) => (
        <span>{getTimeWithHours(value)}</span>
      )
    },
    {
      Header: 'Actions',
      accessor: '_id',
      Cell: ({ row }) => (
        <div className='flex gap-2 flex-wrap'>
          <button className='text-red-500 font-semibold' onClick={() => deleteComment(row?.original?._id, "")}>Delete</button>
          {row.original.status === 'pending' && (
            <button className=' text-green-500 font-semibold' onClick={() => approveComment(row?.original?._id, "")}>Approve</button>
          )}
        </div>
      ),
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className='border-collapse w-full'>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column, i) => (
              <th {...column.getHeaderProps()} key={i} style={{ borderBottom: '1px solid black', padding: '10px', textAlign: 'left' }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <React.Fragment key={i}>
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, index) => (
                  <td {...cell.getCellProps()} key={index} style={{ padding: '10px', borderBottom: '1px solid gray' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
              {expandedRows[row?.original?._id] && row?.original?.replies && row?.original?.replies.length > 0 && (
                <tr style={{ borderBottom: '1px solid gray', paddingBottom: "20px" }}>
                  <td colSpan={columns.length}
                    className='pl-5'
                  >
                    <table className='w-full'>
                      <thead className='text-left'>
                        <tr>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Reply</th>
                          <th>IP</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {row.original.replies.map((reply) => (
                          <tr className='border-t-[1px] border-b-[1px] border-slate-400' key={reply._id}>
                            <td>{reply.name}</td>
                            <td className={`${reply.status === "approved" ? "text-green-500" : "text-yellow-500"}`}>{reply.status}</td>
                            <td className='max-w-[300px] h-auto'>{reply.reply}</td>
                            <td>{reply.ip}</td>
                            <td>{getTimeWithHours(reply.submittedOn)}</td>
                            <td className='flex gap-2 flex-wrap'>
                              <button className='text-red-500 font-semibold' onClick={() => deleteComment(row.original._id, reply._id)}>Delete</button>
                              {reply.status === 'pending' && (
                                <button className=' text-green-500 font-semibold' onClick={() => approveComment(row.original._id, reply._id)}>Approve</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

const approveComment = async (comment_id, reply_id = null) => {
  console.log('Approving comment with ID:', comment_id, 'and reply ID:', reply_id);
  const host = await hostname();
  const res = await fetch(`${host}/api/admin/change-comment-status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "approve",
      comment_id,
      reply_id
    })
  });
  const data = await res.json();
  if (data.status === 200) {
    toast.success(data?.message)
  } else {
    toast.error(data?.message)
  }
};

const deleteComment = async (comment_id, reply_id = null) => {
  const host = await hostname();
  const res = await fetch(`${host}/api/admin/change-comment-status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "delete",
      comment_id,
      reply_id
    })
  });
  const data = await res.json();
  if (data?.status === 200) {
    toast.success(data?.message)
  } else {
    toast.error(data?.message)
  }
};

export default CommentTable;
