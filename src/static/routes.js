import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import { HomeView, LoginView, ProtectedView, QuestionnaireView, NotFoundView, PortfolioView } from './containers';
import requireAuthentication from './utils/requireAuthentication';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={HomeView}/>
        <Route path="login" component={LoginView}/>
        <Route path="protected" component={requireAuthentication(ProtectedView)}/>
        <Route path="questionnaire" component={QuestionnaireView}/>
        <Route path="portfolio" component={PortfolioView}/>
        <Route path="*" component={NotFoundView}/>
    </Route>
);
