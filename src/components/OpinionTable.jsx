/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { hostname } from '@/constants/hostname.mjs';
import replyOpinion from '@/serverActions/replyOpinion.mjs';
import getTimeWithHours from '@/utils/getTimeWithHours.mjs';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTable } from 'react-table';

const OpinionTable = ({ opinions }) => {
    const data = React.useMemo(() => opinions, [opinions]);
    const initialExpandedRows = React.useMemo(() => {
        const expanded = {};
        opinions.forEach(opinion => {
            if (opinion.replies && opinion.replies.length > 0) {
                expanded[opinion._id] = true;
            }
        });
        return expanded;
    }, [opinions]);

    const [expandedRows, setExpandedRows] = useState(initialExpandedRows);

    const replyOption = async (formData) => {
        const res = await replyOpinion(formData)
        if (res.error) { return toast.error(res?.error) }
        else {
            toast.success("Reply sent.")
            window.location.reload()
        }
    }
    const columns = React.useMemo(() => [
        {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ value }) => (
                <span className="max-w-fit">{value}</span>
            )
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ value }) => (
                <span className={`${value === "approved" ? "text-green-500" : "text-yellow-500"} max-w-fit`}>{value}</span>
            )
        },
        {
            Header: 'Message',
            accessor: 'message',
            Cell: ({ row }) => (
                <>
                    <p className='cursor-pointer  lg:w-auto md:min-w-[600px] min-w-[300px] h-auto'>
                        {row?.original?.message} {row?.original?._id}
                    </p>
                    {
                        row?.original?.replies?.length === 0 && row?.original?.status === "approved" && <form action={replyOption}>
                            <div className="hidden">
                                <input
                                    name="comment_id"
                                    type="text"
                                    readOnly
                                    value={row?.original?._id}
                                />
                            </div>
                            <div className="space-y-2">
                                <textarea
                                    className="h-auto text-sm w-full text-black bg-white rounded border px-3 py-2 leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                                    id="reply_message"
                                    placeholder="Type your reply"
                                    name="message"
                                />

                                <button className='p-1 bg-slate-500 rounded text-white text-xs ' type='submit'>Reply</button>
                            </div>
                        </form>
                    }
                </>
            )
        },
        {
            Header: 'Ip',
            accessor: 'ip',
            Cell: ({ value }) => (
                <span className="w-fit">{value}</span>
            )
        },
        {
            Header: 'Email',
            accessor: 'email',
            Cell: ({ value }) => (
                <span className="w-fit">{value}</span>
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
                <div className='flex gap-2 flex-wrap w-auto h-auto'>
                    <button className='text-red-500 font-semibold' onClick={() => deleteOpinion(row?.original?._id, "")}>Delete</button>
                    {row.original.status === 'pending' && (
                        <button className=' text-green-500 font-semibold' onClick={() => approveOpninion(row?.original?._id, "")}>Approve</button>
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
        <>
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
                                    {row?.cells?.map((cell, index) => (
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
                                                        <th>Reply</th>
                                                        <th>Date</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {row.original.replies.map((reply) => (
                                                        <tr className='border-t-[1px] border-b-[1px] border-slate-400' key={reply._id}>
                                                            <td className='max-w-[300px] h-auto'>{reply.reply}</td>
                                                            <td>{getTimeWithHours(reply?.submittedOn)}</td>
                                                            <td className='flex gap-2 flex-wrap'>
                                                                <button className='text-red-500 font-semibold' onClick={() => deleteOpinion(row?.original?._id, reply?._id)}>Delete</button>
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
        </>
    );
};


const approveOpninion = async (comment_id, reply_id = null) => {
    const host = await hostname();
    const res = await fetch(`${host}/api/admin/change-opinion-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            action: "approve",
            comment_id,
            reply_id,
        })
    });
    const data = await res.json();
    if (data.status === 200) {
        toast.success(data?.message)
        window.location.reload()
    } else {
        toast.error(data?.message)
    }
};

const deleteOpinion = async (comment_id, reply_id = null) => {
    const host = await hostname();
    const res = await fetch(`${host}/api/admin/change-opinion-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            action: "delete",
            comment_id,
            reply_id,
        })
    });
    const data = await res.json();
    if (data?.status === 200) {
        toast.success(data?.message)
        window.location.reload()
    } else {
        toast.error(data?.message)
    }
};

export default OpinionTable;
