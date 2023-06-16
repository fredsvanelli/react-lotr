import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const PageTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
  margin-bottom: 2rem;
`

export const BreadCrumb = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const BreadCrumbItem = styled(Link)`
  text-decoration: none;
  color: gray;

  &:hover {
    text-decoration: underline;
  }

  &:not(:last-child)::after {
    content: '/';
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`

export const Title = styled.h1`
  display: inline-block;
  margin: 0;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: gold;
    margin-top: 0.5rem;
  }
`
