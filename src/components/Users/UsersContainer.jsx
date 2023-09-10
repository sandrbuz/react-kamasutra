import React from 'react';
// import UsersAPIComponent from './UsersAPIComponent';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { followActionCreator, setCurrentPageAC, setTotalUsersCountAC, setUsersActionCreator, toggleIsFetchingAC, unfollowActionCreator } from '../../redux/users-reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import Users from './Users';



class UsersContainer extends React.Component {

  // constructor(props){
  //     super(props)

  // }

  componentDidMount() {
      this.props.toggleIsFetching(true);
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}`)
          .then(response => {
              return this.props.setUsers(response.data.items),
                  this.props.setTotalUsersCount(response.data.totalCount),
                 this.props.toggleIsFetching(false)
          })
  }

  onPageChanged = (pageNumber) => {
      this.props.toggleIsFetching(true);
      this.props.setCurrentPage(pageNumber);
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}`)
          .then(response => {
              return this.props.setUsers(response.data.items),
              this.props.toggleIsFetching(false)
          })
  }

  // getUsers() {
  //     if(this.props.users.length === 0){
  //         axios.get('https://social-network.samuraijs.com/api/1.0/users')

  //         .then(response => this.props.setUsers(response.data.items))

  //      }
  // }

  render() {
      return (
          <Users  totalUsersCount={this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  onPageChanged={this.onPageChanged}
                  currentPage={this.props.currentPage}
                  users={this.props.users}
                  unfollow={this.props.unfollow}
                  follow={this.props.follow}
                  isFetching={this.props.isFetching}
                  
          />
      )
  }

}

const mapStateToProps = (state) => {
    return {
         users: state.usersPage.users,
         pageSize: state.usersPage.pageSize,
         totalUsersCount: state.usersPage.totalUsersCount,
         currentPage: state.usersPage.currentPage,
         isFetching: state.usersPage.isFetching
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

       follow: (userId) => {
         dispatch(followActionCreator(userId))
       },
       unfollow: (userId) => {
        dispatch(unfollowActionCreator(userId))
       },
       setUsers: (users) => {
        dispatch(setUsersActionCreator(users))
       },
       setTotalUsersCount: (totalCount) => {
        dispatch(setTotalUsersCountAC(totalCount))
       },
       setCurrentPage: (pageNumber) => {
        dispatch(setCurrentPageAC(pageNumber))
      },
      toggleIsFetching: (isFetching) => {
        dispatch(toggleIsFetchingAC(isFetching))
    }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

// export default UsersContainer;

