import React, { Component } from 'react';

class SearchItem extends Component {
    render() {
        const item = this.props.item;
        return (
            <a className="search-item" role="button" aria-label={`View Map Info Window for ${item.title}`}>
                {   item.imageUrl ?
                    <img className="search-item-image"
                        src={item.imageUrl === 'image-load-error' ? require('../images/image-load-error.jpg') : item.imageUrl }
                        alt={item.title} /> :
                    <p className="search-item-image-loading">Loading Image, please wait...</p>
                }
                <h1 id={`search-item-${item.id}`} className="search-item-name">{item.title}</h1>
            </a>
        )
    }
}

export default SearchItem