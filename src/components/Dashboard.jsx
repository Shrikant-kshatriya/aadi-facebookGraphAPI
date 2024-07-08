import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [pages, setPages] = useState([]);
    const [selectedPageId, setSelectedPageId] = useState('');
    const [pageStats, setPageStats] = useState(null);
    const [sinceDate, setSinceDate] = useState('');
    const [untilDate, setUntilDate] = useState('');

    useEffect(() => {
        // Redirect to login if user is not logged in
        if (!user) {
            navigate('/login');
        } else {
            fetchUserPages();
        }
    }, [user, navigate]);

    const fetchUserPages = () => {
        window.FB.api(
            '/me/accounts',
            'GET',
            {},
            function(response) {
                if (response && !response.error) {
                    setPages(response.data);
                } else {
                    console.error('Error fetching user pages:', response.error);
                }
            }
        );
    };

    const fetchPageStats = (pageId, pageAccessToken, since = '', until = '') => {
        if (window.FB && pageAccessToken) {
            const params = {
                metric: 'page_fans,page_impressions,page_post_engagements,post_reactions_by_type_total',
                access_token: pageAccessToken,
            };
            if (since && until) {
                params.since = since;
                params.until = until;
                params.period = 'total_over_range';
            }
            window.FB.api(
                `/${pageId}/insights`,
                'GET',
                params,
                function(response) {
                    if (response && !response.error) {
                        const stats = {
                            followers: response.data.find(metric => metric.name === 'page_fans')?.values[0]?.value || 0,
                            engagement: response.data.find(metric => metric.name === 'page_post_engagements')?.values[0]?.value || 0,
                            impressions: response.data.find(metric => metric.name === 'page_impressions')?.values[0]?.value || 0,
                            reactions: response.data.find(metric => metric.name === 'post_reactions_by_type_total')?.values[0]?.value || 0
                        };
                        setPageStats(stats);
                    } else {
                        alert(response.error.error_user_msg);
                        console.error('Error fetching page statistics:', response.error);
                    }
                }
            );
        } else {
            console.error('Facebook SDK not loaded.');
        }
    };
    

    const handleSinceChange = (e) => {
        setSinceDate(e.target.value);
    };

    const handleUntilChange = (e) => {
        setUntilDate(e.target.value);
    };

    const clearForm = () => {
        setSelectedPageId('');
        setSinceDate('');
        setUntilDate('');
        setPageStats(null);
    };

    const handlePageSelect = (e) => {
        const pageId = e.target.value;
        const page = pages.find(p => p.id === pageId);
        setSelectedPageId(pageId);
        if(page.access_token){
            fetchPageStats(pageId, page.access_token, sinceDate, untilDate);
        }
    };

    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div className={pageStats?"w-3/6 mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg":"w-3/6 mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg h-96"}>
                <h2 className="text-2xl font-bold mb-6">Page Dashboard</h2>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Select Page</label>
                        <select
                            value={selectedPageId}
                            onChange={handlePageSelect}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select a page</option>
                            {pages.map(page => (
                                <option key={page.id} value={page.id}>{page.name}</option>
                            ))}
                        </select>
                    </div>

                {/* Date range inputs */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Since Date</label>
                    <input
                        type="date"
                        value={sinceDate}
                        onChange={handleSinceChange}
                        className="mt-1 block w-1/4 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Until Date</label>
                    <input
                        type="date"
                        value={untilDate}
                        onChange={handleUntilChange}
                        className="mt-1 block w-1/4 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Rendering statistics cards if pageStats is available */}
                {pageStats && (
                    <div className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold mb-2">Total Followers / Fans</h3>
                                <p className="text-2xl">{pageStats.followers}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold mb-2">Total Engagement</h3>
                                <p className="text-2xl">{pageStats.engagement}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold mb-2">Total Impressions</h3>
                                <p className="text-2xl">{pageStats.impressions}</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold mb-2">Total Reactions</h3>
                                <p className="text-2xl">{pageStats.reactions}</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="mt-4">
                    <button
                        onClick={clearForm}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Clear Form
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
