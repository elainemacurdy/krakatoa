import $ from 'jquery';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Field, initialize, reduxForm } from 'redux-form';

class ListingForm extends Component {
  componentWillReceiveProps(nextProps) {
    const { dispatch, initialValues } = this.props;
    const nextInitialValues = nextProps.initialValues;
    const isListingChanging = !Object.is(initialValues, nextInitialValues);
    if (isListingChanging) {
      dispatch(initialize('listing', nextInitialValues));
    }
  }

  completeSubmit(listing) {
    $('#listingFormNotification')
      .text(`Listing for "${listing.title}" has been saved successfully!`)
      .show();
    setTimeout( () => { Router.push('/') }, 2000);
  }

  onSubmit = (e) => {
    const { handleCreate, handleUpdate, mutationType } = this.props;
    e.preventDefault();

    // TODO: replace this with redux-form validation
    let title = e.target.elements.title.value;
    let description = e.target.elements.description.value;

    if (title === '' || description === '') {
      window.alert('Both fields are required.');
      return false;
    }

    if (mutationType === 'create') {
      handleCreate(title, description)
        .then(({ data: { createListing } }) => { this.completeSubmit(createListing); });
    } else {
      const { initialValues: { id } } = this.props;
      handleUpdate(id, title, description)
        .then(({ data: { updateListing } }) => { this.completeSubmit(updateListing); });
    }
  };

  render() {
    const { mutationType } = this.props;
    const buttonLabel = (mutationType === 'create') ? "Create" : "Update";

    return (
      <form onSubmit={this.onSubmit}>
        <div id="listingFormNotification" className="notification"></div>
        <div><Field placeholder="Title" name="title" component="input" type="text" className="input"/></div>
        <div><Field placeholder='Description' name='description' component="textarea"/></div>
        <button type='submit'>{buttonLabel}</button>
      </form>
    );
  }
}

ListingForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  mutationType: PropTypes.oneOf(['create', 'update'])
};

export default reduxForm({
  form: 'listing'
})(ListingForm);
