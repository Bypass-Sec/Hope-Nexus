import React from 'react';
import PropTypes from 'prop-types';

function TextCard({ heading, subheading, bodyText, imageUrl, linkUrl }) {
    return (
        <a
            href={linkUrl}
            className="block h-full transform transition-all duration-300 hover:scale-[1.02]"
        >
            <div className="h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-slate-200">
                {/* Image */}
                <div className="aspect-video w-full overflow-hidden">
                    <img
                        src={imageUrl}
                        alt="News Image"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col h-[calc(100%-33.33%)]">
                    <h2 className="text-xl font-bold mb-2 text-blue-900 line-clamp-2">
                        {heading}
                    </h2>

                    <p className="text-sm font-medium mb-3 text-orange-600">
                        {subheading}
                    </p>

                    <p className="text-slate-600 text-sm line-clamp-3 flex-grow">
                        {bodyText}
                    </p>
                    
                    <div className="mt-4 text-blue-600 text-sm font-medium">
                        Read more →
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