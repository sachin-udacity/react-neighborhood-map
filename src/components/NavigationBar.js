import React, { Component } from 'react';

class NavigationBar extends Component {
    render() {
        const isSearchPaneVisible = this.props.isSearchPaneVisible;
        return (
            <nav className="navigation-bar-pane" title='Click to hide/show search pane' aria-label="Breadcrumb" tabIndex="0">
                <a id="show-search-pane-link" className="show-search-pane-link" onClick={this.props.onShowSearchPaneLinkClicked} aria-current="page">
                    <h1 className={`app-title ${isSearchPaneVisible === true ? 'hidden' : ''}`}>Orlando Attractions</h1>
                </a>
            </nav>
        );
    }
}

export default NavigationBar;