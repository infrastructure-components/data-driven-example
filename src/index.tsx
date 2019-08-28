import * as React from 'react';
import "@babel/polyfill";
import {
    DataLayer,
    Environment,
    Route,
    ServiceOrientedApp
} from "infrastructure-components";

import AddArticle from './add-article';
import ArticleEntry from './article-entry';
import ListArticles from './list-articles';
import TagEntry from './tag-entry';

export default (
    <ServiceOrientedApp
        stackName = "data-driven-example"
        buildPath = 'build'
        region='eu-west-1'>

        <Environment name="dev" />

        <Route
            path='/'
            name='Full-Stack React App'
            render={()=><div>
                <AddArticle />
                <ListArticles />
            </div>}
        />

        <DataLayer id="datalayer">

            <ArticleEntry />
            <TagEntry />

        </DataLayer>

    </ServiceOrientedApp>);