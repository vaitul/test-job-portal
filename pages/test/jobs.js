import React, { useEffect, useState } from 'react';
import JobCard from '../../components/JobCard';
import SearchBox from '../../components/SearchBox';
import Toolbar from '../../components/Toolbar';
import Head from "next/head";

const Jobs = ({ data, error }) => {
    // this state crated for store the fitered data
    const [finalData, setFinalData] = useState([])
    //this state contains search query.
    const [searchText, setSearchText] = useState("");
    //this state contains state of "Show only jobs which published in the last 7 days" filter.
    const [sevenDayFilter, setSevenDayFilter] = useState(false)

    // this logic filter results by search & other filter query is search query empty then it shows all records.
    // dependacy indicates if any one changed out of data, searchText or sevenDayFilter then login inside useEffect will run. 
    useEffect(() => {
        setFinalData((data?.jobs ?? []).filter(function (x, i) {
            const dayFilter = sevenDayFilter === false || parseInt(x.postedDate.split("d ago").join("")) <= 7;
            //it show only first 10 jobs only
            return i < 10 && dayFilter && x.companyName.toLowerCase().match(eval("/" + searchText.toLowerCase() + "/g"));
        }));
    }, [data, searchText, sevenDayFilter])

    if (error) {
        return (
            <div className="text-center pt-5 bg-danger bg-grandient text-light" style={{ height: '100vh' }}>
                {error}
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Zippia Job Portal</title>
            </Head>
            <div className="container-fluid m-0 p-0 ">
                {/* Top header area which includes search control and top heading text */}
                <div className="row">
                    <div className="col-md-8 offset-md-2 col-xs-10 offset-xs-1 ">
                        <div className="main-container my-2 p-2">
                            <div className="heading-row">
                                <div className="cover-box-content">
                                    <div className="text-center">
                                        <br />
                                        <h1 style={{ color: "rgb(0, 77, 41)" }}><b>FIND YOUR DREAM JOB</b></h1>
                                        <br />
                                        {/* Search box component which represent search input control */}
                                        <div className="row">
                                            <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                                                {/* Search filter box */}
                                                <SearchBox searchedText={searchText} onSearch={(t) => setSearchText(t)} />

                                                {/* "Show only last 7 days jobs" filter */}
                                                <Toolbar value={sevenDayFilter} onChange={setSevenDayFilter} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* checks if search query exist or if exist then show total no. of jobs. */}
                            {(!!searchText || !!sevenDayFilter) && (
                                <div className="text-center mb-2">
                                    {searchText !== "" ? (<><i>{searchText}</i> related</>) : ""} <b>{finalData.length}</b> Jobs found out of <b>10</b>.
                                </div>
                            )}

                            {/* This code generates cards of jobs */}
                            <div className="row px-4 g-4">
                                {
                                    finalData.map((card, cardIndex) => (
                                        <div className="col-lg-6" key={card.jobId} >
                                            <JobCard cardData={card} />
                                        </div>
                                    ))
                                }
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Jobs;

// Here we implemented server side rendering getServerSideProps will fetch data and pass it to the component at build time.
export async function getServerSideProps() {
    const res = await fetch(`https://www.zippia.com/api/jobs/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "companySkills": true,
            "dismissedListingHashes": [],
            "fetchJobDesc": true,
            "jobTitle": "Business Analyst",
            "locations": [],
            "numJobs": 20,
            "previousListingHashes": []
        })
    });

    // we check is there any errors or not
    let data = null;
    let error = null;
    if (res.status === 200) {
        data = await res.json();
    } else {
        error = await res.statusText;
    }
    return {
        props: { data, error }, // will be passed to the page component as props
    }
}
