/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import React from 'react';
import MappleToolTip from 'reactjs-mappletooltip';

const FeedbackBar = ({ positive, comments, negative }) => {
    const total = positive + comments + negative;
    const positivePercent = Math.round((positive / total) * 100);
    const commentsPercent = Math.round((comments / total) * 100);
    const negativePercent = Math.round((negative / total) * 100);

    return (
        <div className="w-full  mt-1">
            <div className="flex h-full">
                <div
                    className={`h-full flex items-center justify-center text-white bg-green-500 rounded-md mr-1 overflow-hidden mx-1`}
                    style={{ width: `${positivePercent}%` }}
                >
                    <MappleToolTip>
                        <div className="text-xs px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {positivePercent}
                        </div>
                        <div className="text-xs px-1">{positivePercent}%</div>
                    </MappleToolTip>
                </div>
                <div
                    className={`h-full flex items-center justify-center bg-yellow-400 text-black rounded-md mr-1 overflow-hidden mx-1`}
                    style={{ width: `${commentsPercent}%` }}
                >
                    <MappleToolTip>
                        <div className="text-xs px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {commentsPercent}
                        </div>
                        <div className="text-xs px-1">{commentsPercent}%</div>
                    </MappleToolTip>
                </div>
                <div
                    className={`h-full flex items-center justify-center text-white bg-red-500 rounded-md overflow-hidden mx-1`}
                    style={{ width: `${negativePercent}%` }}
                >
                    <MappleToolTip>
                        <div className="text-xs px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                            {negativePercent}
                        </div>
                        <div className="text-xs px-1">{negativePercent}%</div>
                    </MappleToolTip>
                </div>
            </div>
        </div>
    );
};

export default FeedbackBar;