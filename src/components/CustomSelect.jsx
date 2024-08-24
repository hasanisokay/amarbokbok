import Select from 'react-select';

const CustomSelect = ({ defaultValue, options, onChange, classes }) => {
    return (
        <Select
            defaultValue={defaultValue}
            options={options}
            onChange={onChange}
            className={` ${classes}  w-fit text-black`}
        />

    );
};

export default CustomSelect;