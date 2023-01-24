import styled from 'styled-components';
import DeleteModal from '../modal/DeleteModal'
import CommentInput from './CommentInput';
import CommentList from './CommentList';

export default function Comments() {
  return (
    <>
      <CommentInput />
      <CommentList />
    </>
  );
}

