import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import Container from 'semantic-ui-react/dist/es/elements/Container'
import Feed from 'semantic-ui-react/dist/es/views/Feed'
import Icon from 'semantic-ui-react/dist/es/elements/Icon'

const ImgBaseUrl='https://react.semantic-ui.com/';

const FeedExampleBasic = () => (
<Container>
	<Feed>
		<Feed.Event>
			<Feed.Label>
				<img src={ ImgBaseUrl + '/images/avatar/small/elliot.jpg' } />
			</Feed.Label>
			<Feed.Content>
				<Feed.Summary>
					<Feed.User>Elliot Fu</Feed.User> added you as a friend
					<Feed.Date>1 Hour Ago</Feed.Date>
				</Feed.Summary>
				<Feed.Meta>
					<Feed.Like>
						<Icon name='like' />4 Likes
					</Feed.Like>
				</Feed.Meta>
			</Feed.Content>
		</Feed.Event>

		<Feed.Event>
			<Feed.Label image={ ImgBaseUrl + '/images/avatar/small/helen.jpg' } />
			<Feed.Content>
				<Feed.Summary>
					<a>Helen Troy</a> added <a>2 new illustrations</a>
					<Feed.Date>4 days ago</Feed.Date>
				</Feed.Summary>
				<Feed.Extra images>
					<a>
						<img src={ ImgBaseUrl + '/images/wireframe/image.png' } />
					</a>
					<a>
						<img src={ ImgBaseUrl + '/images/wireframe/image.png' } />
					</a>
				</Feed.Extra>
				<Feed.Meta>
					<Feed.Like>
						<Icon name='like' />1 Like
					</Feed.Like>
				</Feed.Meta>
			</Feed.Content>
		</Feed.Event>

		<Feed.Event>
			<Feed.Label image={ ImgBaseUrl + '/images/avatar/small/jenny.jpg' } />
			<Feed.Content>
				<Feed.Summary
					date='2 Days Ago'
					user='Jenny Hess'
					content='add you as a friend'
				/>
				<Feed.Meta>
					<Feed.Like>
						<Icon name='like' />8 Likes
					</Feed.Like>
				</Feed.Meta>
			</Feed.Content>
		</Feed.Event>

		<Feed.Event>
			<Feed.Label image={ ImgBaseUrl + '/images/avatar/small/joe.jpg' } />
			<Feed.Content>
				<Feed.Summary>
					<a>Joe Henderson</a> posted on his page
					<Feed.Date>3 days ago</Feed.Date>
				</Feed.Summary>
				<Feed.Extra text>
					Ours is a life of constant reruns. We're always circling back to where
					we'd we started, then starting all over again. Even if we don't run
					extra laps that day, we surely will come back for more of the same
					another day soon.
				</Feed.Extra>
				<Feed.Meta>
					<Feed.Like>
						<Icon name='like' />5 Likes
					</Feed.Like>
				</Feed.Meta>
			</Feed.Content>
		</Feed.Event>

		<Feed.Event>
			<Feed.Label image={ ImgBaseUrl + '/images/avatar/small/justen.jpg' } />
			<Feed.Content>
				<Feed.Summary>
					<a>Justen Kitsune</a> added <a>2 new photos</a> of you
					<Feed.Date>4 days ago</Feed.Date>
				</Feed.Summary>
				<Feed.Extra images>
					<a>
						<img src={ ImgBaseUrl + '/images/wireframe/image.png' } />
					</a>
					<a>
						<img src={ ImgBaseUrl + '/images/wireframe/image.png' } />
					</a>
				</Feed.Extra>
				<Feed.Meta>
					<Feed.Like>
						<Icon name='like' />
						41 Likes
					</Feed.Like>
				</Feed.Meta>
			</Feed.Content>
		</Feed.Event>
	</Feed>
</Container>
)

export default FeedExampleBasic

