import React, { useEffect, useState } from "react";
import { FormProvider, FTextField } from "../../components/form";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Container, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import { useDispatch } from "react-redux";

import { createInterest, updateInterest } from "./interestSlice";

const interestSchema = Yup.object().shape({
  interestType: Yup.string().required("Username is required"),
  interestCode: Yup.string().required("interestCode is required"),
  description: Yup.string().required("description is required"),
  dateStart: Yup.string().required("dateStart is required"),
  dateEnd: Yup.string().required("dateEnd is required"),
  interest: Yup.string().required("interest is required"),
});

export default function FormModalInterest({
  open,
  handleClose,
  mode,
  selectedInterest,
  modalKey,
  refreshData,
}) {
  console.log(selectedInterest);
  const defaultValues = {
    interestType: selectedInterest ? selectedInterest.interestType : "",
    interestCode: selectedInterest ? selectedInterest.interestCode : "",
    description: selectedInterest ? selectedInterest.description : "",
    dateStart: selectedInterest ? selectedInterest.dateStart : "",
    dateEnd: selectedInterest ? selectedInterest.dateEnd : "",
    interest: selectedInterest ? selectedInterest.interest : "",
  };
  const [data, setData] = useState(defaultValues);
  console.log(data);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const methods = useForm({
    resolver: yupResolver(interestSchema),
    defaultValues,
  });
  const {
    control,
    reset,
    setError,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (mode === "create") handleCreate(data);
    else handleEdit(data);
    handleClose();
  };

  const handleEdit = async (data) => {
    dispatch(
      updateInterest({
        ...data,
        interestId: selectedInterest._id,
      })
    );
  };

  const handleCreate = async (data) => {
    dispatch(createInterest(data));
  };

  useEffect(() => {
    if (selectedInterest?._id) {
      setErrors({});
      setData(selectedInterest);
    } else setData(defaultValues);
  }, [selectedInterest]);

  return (
    <Container maxWidth="xs">
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={() => {
          handleClose();
          setErrors({});
        }}
      >
        <DialogTitle color="primary">
          {mode === "create"
            ? "Create a new Interest"
            : `Update info ${selectedInterest?.interestCode}`}
        </DialogTitle>
        <FormProvider methods={methods}>
          <Stack spacing={2}>
            <DialogContent>
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Stack spacing={0.5}>
                      <Typography>Type Product</Typography>
                      <Controller
                        name="interestType"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            value={data.interestType}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.interestType)}
                            helperText={errors.interestType?.message}
                            onChange={handleChange}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={4}>
                    <Stack spacing={0.5}>
                      <Typography>Interest Code</Typography>
                      <Controller
                        name="interestCode"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            value={data.interestCode}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.interestCode)}
                            helperText={errors.interestCode?.message}
                            onChange={handleChange}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={4}>
                    <Stack spacing={0.5}>
                      <Typography>Interest Rate</Typography>
                      <Controller
                        name="interest"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            value={data.interest}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.interest)}
                            helperText={errors.interest?.message}
                            onChange={handleChange}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Divider />
                  <Grid item xs={2}>
                    <Stack spacing={0.5}>
                      <Typography>Date Start</Typography>
                      <Controller
                        name="dateStart"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            value={data.dateStart}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.dateStart)}
                            helperText={errors.dateStart?.message}
                            onChange={handleChange}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={2}>
                    <Stack spacing={0.5}>
                      <Typography>Date Start</Typography>
                      <Controller
                        name="dateEnd"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            value={data.dateEnd}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.dateEnd)}
                            helperText={errors.dateEnd?.message}
                            onChange={handleChange}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={8}>
                    <Stack spacing={0.5}>
                      <Typography>Description</Typography>
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            value={data.description}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.description)}
                            helperText={errors.description?.message}
                            onChange={handleChange}
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button color="warning" onClick={handleClose}>
                Cancel
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                {mode === "create" ? "Create" : "Save"}
              </Button>
            </DialogActions>
          </Stack>
        </FormProvider>
      </Dialog>
    </Container>
  );
}
