import React, { Component } from "react";
import ListContacts from "./ListContacts";
import PropTypes from "prop-types";
import * as ContactsAPI from "./utils/ContactsAPI";
import { Route } from "react-router-dom";
import AddContact from "./AddContact";

class App extends Component {
  state = {
    contacts: [],
  };
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => this.setState({ contacts }));
  }
  createContact = (contact) => {
    ContactsAPI.create(contact).then((contact) => {
      this.setState(
        (currentState) => ({
          contacts: [...currentState.contacts, contact],
        })
      );
    });
  };
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id;
      }),
    }));
    ContactsAPI.remove(contact);
  };
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
          )}
        />
        <Route
          path="/create"
          render={({history}) => (
            <AddContact
              onCreateContact={(contact) => {
                this.createContact(contact)
                history.push('/')
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
