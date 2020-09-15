import React from "react";
import { SearchBar } from "react-native-elements";
import styles from "./BusinessSearchBar.component.style";

export default class BusinessSearchBar extends React.Component {
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainer}
        round
        placeholder="Search for businesses..."
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}
