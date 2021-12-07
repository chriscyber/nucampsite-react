import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreators';
import { actions } from 'react-redux-form'; //to use actions.reset action (line28)


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

//as an object. can also be a function
const mapDispatchToProps = {
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()), //fetchCampsites action component available to Main as props
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    fetchPartners: () => (fetchPartners()),
    postFeedback: (feedback) => (postFeedback(feedback))
};

class Main extends Component {

    componentDidMount() { //react lifecycle method (componentDidMount is called right after a component renders into DOM)
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();

    }

    render() {

        const HomePage = () => {
            return (
                <Home
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]} //campsites array comes out of an object also called campsites
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}
                    partner={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    partnersLoading={this.props.partners.isLoading}
                    partnersErrMess={this.props.partners.errMess}
                />
            );
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                /> 
            );
        };

        return (
            // use render attribute if rendering state data. otherwise, use component attribute.
            <div>
                <Header />
                <Switch> 
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                    <Route exact path='/contactus' render={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} /> } /> 
                    {/*<Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} /> {/* changed from component attribute to render attribute */}
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/aboutus' render={() => <About partners={this.props.partners} />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));