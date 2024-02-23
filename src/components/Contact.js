import { useState, useEffect } from 'react';
import axios from 'axios';

function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [selectData, setSelectData] = useState([]);
  const [selectValue, setSelectValue] = useState('');

  useEffect(() => {
    let processing = true;

    axiosFetchData(processing);

    return () => {
      processing = false;
    };
  }, []);

  // const fetchData = async (processing) => {
  // Sätt in variabeln option efter https adressen beroende på vem du skall ha post el get

  // await fetch('https://jsonplaceholder.typicode.com/users', option)

  // const option = {
  //   method: 'POST',
  //   headers: { 'Content-type': 'application/json' },
  //   body: JSON.stringify({
  //     email: email,
  //     message: message,
  //   }),
  // };

  //   await fetch('https://jsonplaceholder.typicode.com/users')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (processing) {
  //         setSelectData(data);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  const axiosFetchData = async (processing) => {
    // Vid metoden post är det bara skriva in den här variabeln
    // .post('https://jsonplaceholder.typicode.com/users', options)
    // const options = {
    //   email: email,
    //   message: message,
    // };

    await axios
      // Går att välja post, get etc direkt
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (processing) {
          setSelectData(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const SelectDropdown = () => {
    return (
      <select
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
      >
        {selectData?.map((item) => (
          <option value={item.website} key={item.website}>
            {item.website}
          </option>
        ))}
      </select>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email + ' | ' + selectValue + ' | ' + message);

    if (!message) {
      setError(
        <p className="required">Message is empty. Please type a message</p>
      );
    } else {
      setError('');
    }
  };

  return (
    <div>
      <h1>Contact</h1>

      <form className="contactForm">
        <label>Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>How did you hear about us?</label>
        <SelectDropdown />

        <label>Message</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        {error}

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
