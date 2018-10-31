import React, { Component } from 'react';
import SearchPlace from './SearchPlace'
import SearchList from './SearchList'

class SearchPane extends Component {
    render() {
        const items = this.props.items;
        const isSearchPaneVisible = this.props.isSearchPaneVisible;
        return (
            <aside className={`search-pane ${isSearchPaneVisible === true ?  'search-pane-visible' : ''}`}>
                <SearchPlace onSearchTextChanged={this.props.onSearchTextChanged}
                             isSearchPaneVisible={this.props.isSearchPaneVisible} />
                <SearchList items={items}
                            onItemClicked={this.props.onItemClicked} />
            </aside>
        );
    }
}


export default SearchPane;