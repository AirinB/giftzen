import { useRef } from 'react';
import styled from 'styled-components';
import { Avatar, Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePicContainer = styled(Box)`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;

  .action {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(100, 100, 100, 0.7);
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    ${CloudUploadIcon} {
      color: white;
    }
  }

  :hover {
    .action {
      display: flex;
    }
  }
`;

export default function AccountProfile(props) {
  const uploadImageRef = useRef(null);
  const { currentUser: user, uploadProfilePic, uploadProgress } = useAuth();

  console.log(user);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    uploadProfilePic(file, user);
  };

  const handleUploadClick = () => {
    if (uploadProgress) return;
    uploadImageRef.current.click();
  };

  return (
    <Card {...props}>
      <input onChange={onFileChange} style={{ display: 'none' }} type="file" ref={uploadImageRef} />
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {!uploadProgress && (
            <ProfilePicContainer>
              <Avatar
                src={user.photoUrl}
                sx={{
                  height: 64,
                  mb: 2,
                  width: 64,
                }}
              />
              <div className="action" onClick={handleUploadClick}>
                <CloudUploadIcon />
              </div>
            </ProfilePicContainer>
          )}
          {!!uploadProgress && <CircularProgress variant="determinate" value={uploadProgress} />}
          <Typography mt={3} color="textPrimary" gutterBottom variant="h5">
            {user.name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
