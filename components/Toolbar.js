import React from 'react';

const Toolbar = ({ value, onChange }) => {
    return (
        <div className="row my-2 py-2  rounded">
            <div className="col">
                <div className="form-check form-switch">
                    <input checked={value} onChange={e => onChange(e.target.checked)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show only jobs which published in the last 7 days</label>
                </div>
            </div>
            <style jsx>
                {`
            .form-check-input:checked {
                background-color: #198754;
                border-color: #198754;
            }
            .form-check{
                text-align:initial;
            }
            .form-check-input{
                height:1.2rem;
                width:2.5rem;
                margin-right:5px;
            }
            .form-check-label{
                margin-top:1px;
            }
            `}
            </style>
        </div>
    );
};

export default Toolbar;