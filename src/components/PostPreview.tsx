import { Grid, IconButton, Typography, Paper } from '@mui/material';
import React from 'react';
import { Post } from '../API';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Props {
  post: Post;
}

function PostPreview({ post }: Props) {
  return (
    <Paper elevation={3}>
      <Grid
        container
        direction={'row'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        spacing={3}
        style={{ width: '100%', padding: 12, marginTop: 24 }}
      >
        <Grid
          container
          direction={'column'}
          item
          spacing={1}
          alignItems={'center'}
          style={{ maxWidth: '128px' }}
        >
          <Grid item>
            <IconButton>
              <ArrowUpwardIcon htmlColor='white' />
            </IconButton>
          </Grid>
          <Grid item>{(post.upvotes - post.downvotes).toString()} votes</Grid>
          <Grid item>
            <IconButton>
              <ArrowDownwardIcon htmlColor='white' />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction={'column'} alignItems='flex-start'>
            <Grid item>
              <Typography variant='body2'>
                Posted by {post.owner} at {post.createdAt}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='h2'>{post.title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>{post.contents}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PostPreview;
