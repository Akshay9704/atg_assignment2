import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';

const Main = () => {
    const [data, setData] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    async function fetchData() {
        try {
            const response = await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingUsers(false);
        }
    }

    const handleClick = async (user) => {
        setLoadingDetails(true);
        setSelectedUser(null);

        try {
            const response = await axios.get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${user.id}`);
            console.log(response.data);
            setSelectedUser(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingDetails(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let number = 1; number <= Math.ceil(data.length / itemsPerPage); number++) {
        pageNumbers.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <>
            <div className='main'>
                <div className='users_list'>
                    <h2 className='users_list_h'>USERS LIST</h2>
                    {loadingUsers ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : currentUsers.length > 0 ? (
                        <>
                            {currentUsers.map((item) => (
                                <div className='users_list_item' key={item.id}>
                                    <Button onClick={() => handleClick(item)} variant="outline-info" className='users_list_item_name'>
                                        {item?.profile?.username}
                                    </Button>
                                </div>
                            ))}
                            <div className="pagination">
                                <Pagination size="sm">
                                    {pageNumbers}
                                </Pagination>
                            </div>
                        </>
                    ) : (
                        <p>No Users To Display</p>
                    )}
                </div>
                <div className='users_details'>
                    <h2 className='users_details_h'>USER DETAILS</h2>
                    {loadingDetails ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : selectedUser && (
                        <div className='users_details_item'>
                            <img src={selectedUser?.avatar} alt='avatar' loading="lazy" />
                            <h3>{`@${selectedUser?.profile?.username}`}</h3>
                            <Card>
                                <Card.Body className='bio-card'>{selectedUser?.Bio}</Card.Body>
                            </Card>
                            <Form className='form'>
                                <Form.Group className='form-group'>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control className='form-value' type="text" value={selectedUser?.profile?.firstName} readOnly />
                                </Form.Group>
                                <Form.Group className='form-group'>
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control className='form-value' type="text" value={selectedUser?.jobTitle} readOnly />
                                </Form.Group>
                                <Form.Group className='form-group'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control className='form-value' type="text" value={selectedUser?.profile?.email} readOnly />
                                </Form.Group>
                            </Form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Main;

