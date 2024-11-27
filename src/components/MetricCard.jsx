import React from 'react';

function MetricCard({ color, icon, title, value, unit }) {
    return (
        <div className={`bg-gradient-to-b from-${color}-200 to-${color}-100 border-b-4 border-${color}-500 rounded-lg shadow-xl p-5`}>
            <div className="flex flex-row items-center">
                <div className="flex-shrink pr-4">
                    <div className={`rounded-full p-5 bg-${color}-600`}>
                        <i className={`${icon} fa-2x fa-inverse`}></i>
                    </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                    <h2 className="font-bold uppercase text-gray-600">{title}</h2>
                    <p className="font-bold text-3xl">
                        {value} <span className="text-sm">{unit}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MetricCard;