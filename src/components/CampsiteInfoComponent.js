import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent'

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}
    
function RenderComments({comments, addComment, campsiteId}) { //object destructuring to grab
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4> Comments </h4>
                {comments.map(comment => (
                    <>
                        <div key={comment.id}> {comment.text}</div>
                        <p key={comment.id}> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </>
                ))}
                <CommentForm campsiteId={campsiteId} addComment={addComment} /> {/*passing props to child component */}
            </div>
        );
    }
    return <div />;
}

class CommentForm extends Component {
    
    constructor(props) {
        super(props) ;

        //when toggleModal is called, it binds its this keyword to the correct component 
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            rating: 1,
            author: '',
            text: '',
            isModalOpen: false,
            touched: {author: false}
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text); 
        //addComment action creator will use this to create an action with the values in this form. gets dispatched to reducer to update state.
        
    }
    

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader> 
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group"> 
                                <Label htmlFor="rating" md={10}>Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        placeholder="1" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author" md={10}>Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment" md={10}>Comment</Label>
                                    <Control.textarea model=".text" id="text" name="text"
                                        rows="6"
                                        className="form-control"
                                    />  
                            </div>
                            <Button type="submit" value="submit" color="primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container"> 
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) { //if error message from server
        return (
            <div className="container"> {/* to preserve page layout */}
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

    if (props.campsite) {    
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
            );
        }
        return <div />;
}




export default CampsiteInfo;