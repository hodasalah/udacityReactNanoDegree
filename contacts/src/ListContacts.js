import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

class ListContacts extends React.Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };
  state = {
    query: "",
  };
  updateQuery = (query) => {
    this.setState({
      query: query.trim(),
    });
  };
  resetHandler = () => this.updateQuery("");
  render() {
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;
    const showingContacts =
      query === ""
        ? contacts
        : contacts.filter((c) => {
            return c.name.toLowerCase().includes(query.toLowerCase());
          });
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            placeholder="Search Contacts"
            className="search-contacts"
            type="text"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link 
          className="add-contact" to="/create">
            add contact
          </Link>
        </div>
        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now you see {showingContacts.length} of {contacts.length} contacts
            </span>
            <button onClick={this.resetHandler}>Show All</button>
          </div>
        )}
        <ol className="contact-list">
          {showingContacts.map((contact) => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{ backgroundImage: `url(${contact.avatarURL})` }}
              ></div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => onDeleteContact(contact)}
              >
                remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
