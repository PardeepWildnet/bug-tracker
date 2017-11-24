import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as api from './../../data/UserDetail/api';
import './UserDetail.css';

import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class UserDetail extends Component {
	constructor (props) {
		super(props);
		console.log("props", props);
		this.state = {
			id : props.match.params.id, 
			imageUrl : '',
			fileList : []
		}  
	}

	componentWillMount (){
		console.log("id is ", this.props.match.params.id);
		this.props.dispatch(api.fetchUserDetail(this.props.match.params.id));

	}
	handleChange = (info) => {
	    if (info.file.status === 'done') {
	      // Get this url from response in real world.
	      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
	    }
	}

	render () {
		const {
			userDetail
		}= this.props;
    	
    	const imageUrl = this.state.imageUrl;
		
		const props = {
	    	onRemove: (file) => {
		        this.setState(({ fileList }) => {
		          const index = fileList.indexOf(file);
		          const newFileList = fileList.slice();
		          newFileList.splice(index, 1);
		          return {
		            fileList: newFileList,
		          };
		        });
		      },

			beforeUpload: (file) => {
				this.setState(({ fileList }) => ({
				  fileList: [...fileList, file],
				}));
				return false;
			},
	        fileList: this.state.fileList,
	    };

		console.log("user detail ", userDetail);
		return (
			<div className = 'user-detail-view'>
				   <Upload {...props}>
			        {
			          imageUrl ?
			            <img src={imageUrl} alt="" className="avatar" /> :
			            <Icon type="plus" className="avatar-uploader-trigger" />
			        }
			      </Upload>
   
			</div>
		)
	}
}

export default connect(
state => {
		return ({
			userDetail : state.user.data.userDetail[0]
		})
	}
)(UserDetail);
