import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { BasicModal } from "../index";
import { changeNickname } from "../../redux/thunks/userThunks";
import { selectLoading } from "../../redux/slices/authSlice";
import { nicknameRegex } from "../../constants";
import useUserAuth from "../../hooks/useUserAuth";

const ChangeNicknameModal = ({ isOpen, handleClose }) => {
  const { user } = useUserAuth();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const [error, setError] = useState("");
  const nickname = useRef(null);

  useEffect(() => {
    nickname.current = user?.nickname;
  }, [user?.nickname]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (nickname.current === user?.nickname) {
      setError("Enter new nickname.");
      return;
    }

    if (!nicknameRegex.test(nickname.current)) {
      setError(
        "Usernames must only contain alphanumeric characters (minimum 4 characters)."
      );
      return;
    }

    try {
      await dispatch(changeNickname({ nickname: nickname.current })).unwrap();

      handleClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditNickname = (event) => {
    nickname.current = event.target.value;
  };

  return (
    <BasicModal isOpen={isOpen} handleClose={handleClose}>
      <Stack gap={2}>
        <Typography component="h2" variant="h4" textAlign="center">
          Change Username
        </Typography>

        <Typography component="p" variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
          earum!
        </Typography>

        <Box component="form">
          <Box position="relative">
            <TextField
              fullWidth
              id="outlined-basic"
              label="New Nickname"
              variant="outlined"
              onChange={handleEditNickname}
              type="text"
            />
            {loading && (
              <Box>
                <CircularProgress
                  sx={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    translate: "0% -50%",
                  }}
                  size={20}
                  color="inherit"
                />
              </Box>
            )}
          </Box>

          {error && (
            <Typography
              component="p"
              variant="body1"
              mt={1}
              pl={1}
              color={"error"}
            >
              {error}
            </Typography>
          )}

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={2}
            mt={4}
          >
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Stack>
        </Box>

        <IconButton
          size="small"
          sx={{ position: "absolute", top: "-36px", right: "-36px" }}
          onClick={handleClose}
        >
          <CancelOutlinedIcon fontSize="large" />
        </IconButton>
      </Stack>
    </BasicModal>
  );
};

export default ChangeNicknameModal;
