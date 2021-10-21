import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

import GuestList from './GuestList';

import Counter from './Counter';



class App extends Component {
// state controls the functionality of the app
// guest is an array that will hold the info for each guest. These will appear as tiles in the app.
// Remember to keep one type of state, don't combine multiple states in one component. 
// This is called adding properties to the state 
  state = {
// Adding filter
    isFiltered: false,
// Adding to track the form input data
    pendingGuest: "",
    guests: [
      {
        name: 'name1',
        isConfirmed: false,
        // isEditing toggles the views.
        // -When on saved the empty text box appears
        // -When on edit the editied view appears
        isEditing: false
      },
      {
        name: 'name2',
        isConfirmed: true,
        isEditing: false
      },
      {
        name: 'name3',
        isConfirmed: false, 
        isEditing: true
      },
    ]
  }


  // Creating an event handler to manage state or the change
  // This will allow the info to be passed upward to the state
  /*
  toggleConfirmationAt = indexToChange => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            isConfirmed: !guest.isConfirmed
        }
      }
      return guest;
    })
  });
*/


// Attaching a property so isConfimed and isEditing can use the same function
// Using a computed property name to set on the state
  toggleGuestPropertyAt = (property, indexToChange) => 
  this.setState({
    guests: this.state.guests.map((guest, index) => {
      if (index === indexToChange) {
        return {
          ...guest,
          [property]: !guest[property]
      };
    }
    return guest;
  })
});


// Methods or functions to handle change events
toggleConfirmationAt = index =>
  this.toggleGuestPropertyAt("isConfirmed", index);


  removeGuestAt = index =>
  this.setState({
    guests: [
      ...this.state.guests.slice(0, index),
      ...this.state.guests.slice(index + 1)
    ]
  });


toggleEditingAt = index =>
  this.toggleGuestPropertyAt("isEditing", index);

  // Adds names to the state
  handleNameInput = e =>
    this.setState({ pendingGuest: e.target.value });


    newGuestSubmitHandler = e => {
      e.preventDefault();
      this.setState({
        guests: [
          {
            name: this.state.pendingGuest,
            isConfirmed: false,
            isEditing: false
          },
          ...this.state.guests
        ],
        pendingGuest: ''
      });
    }


setNameAt = (name, indexToChange) => 
  this.setState({
    guests: this.state.guests.map((guest, index) => {
      if (index === indexToChange) {
        return {
          ...guest,
         name
      };
    }
    return guest;
  })
});

toggleFilter = () =>
 this.setState({ isFiltered: !this.state.isFiltered });

  // This method gets the total count
  // This is considered creating a method on the class
  getTotalInvited = () => this.state.guests.length;

  getAttendingGuests = () =>
    this.state.guests.reduce(
      (total, guest) => guest.isConfirmed ? total + 1 : total,
      0
    );

  // getConfirmedGuest = () =>


  render () {
    // Called in the render method for the count to update when the app re-renders
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
  return (
    <div className="App">
      <header>
        <h1>RSVP Your Spot! </h1>

        {/* Binding the newGuestSubmit function/handler to the form button */}
        <form onSubmit={this.newGuestSubmitHandler}>
            <input type="text"
            onChange={this.handleNameInput}
            value={this.state.pendingGuest}
            placeholder="Sign Up Here" 
            />
            <button type="submit" name="submit" value="submit">Submit</button>
        </form>
      </header>
      <div className="main">
        <div>
          <h2>Invitees</h2>
          <label>
            <input type="checkbox"
            // bind the method
            onChange={this.toggleFilter}
            checked={this.state.isFiltered}
              /> Hide those who haven't responded
          </label>
        </div>

        <Counter 
        totalInvited={totalInvited}
        numberAttending={numberAttending}
        numberUnconfirmed={numberUnconfirmed}
        />


        <GuestList 
        guests={this.state.guests}
        toggleConfirmationAt={this.toggleConfirmationAt}
        toggleEditingAt={this.toggleEditingAt} 
        setNameAt={this.setNameAt}
        isFiltered={this.state.isFiltered}
        removeGuestAt={this.removeGuestAt}
        pendingGuest={this.state.pendingGuest}
        />
      
      </div>
    </div>
  );
 }
}

export default App;
