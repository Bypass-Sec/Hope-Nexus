import React from 'react';
import PropTypes from 'prop-types';

function TextCard({ heading, subheading, bodyText, imageUrl, linkUrl }) {
    return (
        <a
            href={linkUrl}
            className="block mx-auto relative transform transition-transform duration-300 hover:scale-105"
            style={{ maxWidth: 'calc(24rem + 96px)' }}
        >
            {/* Card container */}
            <div
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                style={{ height: '456px' }} 
            >
                {/* Image */}
                <div className="mb-4">
                    <img
                        src={imageUrl}
                        alt="News Image"
                        className="w-full h-40 object-cover rounded-lg"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between h-full">
                    {/* Heading */}
                    <h2 className="text-2xl font-bold mb-2 text-orange-500">
                        {heading}
                    </h2>

                    {/* Subheading */}
                    <h3 className="text-lg font-semibold mb-4 text-orange-700">
                        {subheading}
                    </h3>

                    {/* Body text */}
                    <div
                        className="text-slate-600 overflow-hidden"
                        style={{
                            height: '100%',
                            display: '-webkit-box',         
                            overflowY: 'hidden',            
                            textOverflow: 'ellipsis',
                            WebkitBoxOrient: 'vertical',   
                            WebkitLineClamp: 3,            
                        }}
                    >
                        {bodyText}
                    </div>
                </div>
            </div>
        </a>
    );
}

TextCard.propTypes = {
    heading: PropTypes.string.isRequired,
    subheading: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    linkUrl: PropTypes.string.isRequired,
};

export default TextCard;