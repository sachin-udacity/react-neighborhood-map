import React, { Component } from 'react';
import * as JSWrappers from '../helpers/JSHtmlWrappers'

class SearchPlace extends Component {
    state = {
      items: []
    }

    handleSearchTextChange = (event) => {
      try {
        /*Reset search*/
        this.setState({
          items: []
        })
        const keywordToSearch = event.target.value.trim();
        if (this.props.onSearchTextChanged) {
          this.props.onSearchTextChanged(keywordToSearch);
        }
      }
      catch(ex) {
        JSWrappers.logError(ex);
      }
    }

    render() {
      const isSearchPaneVisible = this.props.isSearchPaneVisible;
      return (
        <section className="search-items-bar" aria-labelledby="app-title">
          <h1 id="app-title" className={`app-title ${isSearchPaneVisible === false ? 'hidden' : ''}`}>Orlando Attractions</h1>
          <input className="search-items-input" type="text" value={this.state.keywordToSearch}
                  onChange={this.handleSearchTextChange} placeholder="Search by title" role="search" aria-label="Enter text to filter search results." />
        </section>
      );
    }
}

export default SearchPlace;