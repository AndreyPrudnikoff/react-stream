import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Link, BrowserRouter as Router } from 'react-router-dom'
import Nav from '../src/Nav.js'

test('Links didn\'t change', () => {
    const component = renderer.create(
        <Router><Nav/></Router>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

afterEach(cleanup);

it('Navigation component exist', () => {
    const component = render(
        <Router><Nav/></Router>,
    );
});