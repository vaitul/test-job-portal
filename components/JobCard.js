import React from 'react';

const JobCard = ({ cardData }) => {
    return (
        <div className="card bg-gradient border-light">
            <h5 className="card-header bg-light">
                {/*  eslint-disable-next-line @next/next/no-img-element */}
                {cardData.companyLogo && <img className="company-image border border-success" src={cardData.companyLogo} width="28px" alt={cardData.companyName} />}
                &nbsp;{cardData.jobTitle}
            </h5>
            <div className="card-body">
                <h5 className="card-title">
                    <i className="fas fa-building"></i> {cardData.companyName}
                </h5>
                <p className="card-text">{cardData.shortDesc}</p>
            </div>

            <div className="card-footer text-muted d-flex justify-content-between">
                <span className="position-relative">
                    {cardData.postedDate}
                    &nbsp;
                    {cardData.showNewJobBedge && <span style={{ padding: '0 1px', borderRadius: '3px', fontWeight: '600' }} className="bg-success text-light">new</span>}
                </span>
                <span>{cardData.estimatedSalary}</span>
            </div>
            <style>
                {`
                    .card{
                        background-color:rgba(255,255,255,.7);
                        height:100%;
                        box-shadow:0px 0px 3px #888;
                        transition:0.1s ease-in;
                    }
                    .card:hover{
                        background-color:rgba(255,255,255,.9);
                        box-shadow:0px 0px 25px #444;
                        transform:translate(-0px,-0px);
                        scale:1.05;
                        z-index:999;
                    }
                    .card-header{
                        font-weight:600;
                    }
                    .company-image{
                        border-radius:1000px;
                        height:28px;
                    }
                `}
            </style>
        </div>
    );
};

export default JobCard;