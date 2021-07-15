import React, { useState } from 'react';

const SearchBox = ({ onSearch, searchedText }) => {
    // We created state to controll input search box
    const [value, setValue] = useState("");
    return (
        <div className="input-group input-group-md search-control d-flex justify-content-center">
            <span className="input-group-text text-success border-success " id="basic-addon1">
                <i className="fas fa-search"></i>
            </span>
            <input type="text" value={value} onChange={e => { setValue(e.target.value); e.target.value === "" ? onSearch("") : null }} className="form-control border-success " placeholder="Search job by company name" aria-label="Username" aria-describedby="basic-addon1" />
            <button
                onClick={e => {
                    //here we check if searched query and current input value same than means user had already searched so we need to clear search result and input box as well.
                    if (value === searchedText && value !== "" ) {
                        setValue("");
                        onSearch("");
                    } else
                        onSearch(value);
                }}
                className="btn btn-outline-success"
                type="button"
                id="button-addon2">
                {/* here we check if searched query and current input value same than means user had already searched so we need to show clear text on the button. */}
                {value === searchedText && value !== "" ? "Clear" : "Search"}
            </button>


            <style jsx>
                {`
                    .form-control{
                        background-color:rgba(255,255,255,.4);
                    }
                    .input-group-text{
                        font-size:large;
                    }
            `}
            </style>
        </div>
    );
};

export default SearchBox;