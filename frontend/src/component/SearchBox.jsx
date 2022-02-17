import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function SearchBox() {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex m-0'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'

                style={{ width: '12em' }}
            >

            </Form.Control>
            <Button type='submit' variant='outline-success' className='py-1 rounded '>
                search
            </Button></Form>
    )
}

export default SearchBox