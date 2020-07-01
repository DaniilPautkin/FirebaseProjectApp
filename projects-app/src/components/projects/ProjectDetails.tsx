import Text from 'antd/lib/typography/Text'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import './Details.css'
import { AppStateType } from '../../redux/redux-store'
import { ProjectType } from '../../types/types'

type MapStateToPropsType = {
    project: ProjectType
    auth: any
}

const ProjectDetails: React.FC<MapStateToPropsType> = ({ project, auth }) => {
    return !auth.uid ? (
        <Redirect to="/signin" />
    ) : project ? (
        <div>
            <div className="detailsContainer">
                <div className="detailsTitleAndContent">
                    <Text className="title">{project.title}</Text>
                    <Text className="content">{project.content}</Text>
                </div>
                <div>
                    <Text code>{project.authorName}</Text>
                    <Text type="secondary">
                        {project.createdAt
                            ? moment(project.createdAt.toDate()).calendar()
                            : 'loading'}
                    </Text>
                </div>
            </div>
        </div>
    ) : (
        <Redirect to="/" />
    )
}

type OwnPropsType = any

const mapStateToProps = (
    state: AppStateType,
    ownProps: OwnPropsType
): MapStateToPropsType => {
    const id = ownProps.match.params.id
    const projects = state.firestore.data.projects
    const project = projects ? projects[id] : {}

    return {
        project: project,
        auth: state.firebase.auth,
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, {}, OwnPropsType, AppStateType>(
        mapStateToProps
    ),
    firestoreConnect([
        {
            collection: 'projects',
        },
    ])
)(ProjectDetails)
