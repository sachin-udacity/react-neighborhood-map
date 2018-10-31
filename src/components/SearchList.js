import React, { Component } from 'react';
import SearchItem from './SearchItem'

class SearchList extends Component {
    handleItemClicked = (item) => {
        if (this.props.onItemClicked) {
            this.props.onItemClicked(item);
        }
    }

    render() {
        const searchItems = this.props.items.filter(item => item.markerVisible === true);
        return (
            <section className="items-plus-service-credit" aria-label="Orlando Attractions Search Results">
                {   searchItems.length > 0 ?
                    <ol className="items-grid">
                    {
                        searchItems.map(item => (
                            <li key = {item.id} id = {item.id} role='region' aria-labelledby={`search-item-${item.id}`} tabIndex='0' onClick = {() => this.handleItemClicked(item)}>
                                <SearchItem item= {item} />
                            </li>
                        ))
                    }
                    </ol> :
                    <p className="search-items-not-found">No paces found</p>
                }
                <img className='foursquare-logo' src={require('../images/foursquare-logo.png')} alt='Powered by FourSquare logo' />
            </section>
        );
    }
}

export default SearchList;