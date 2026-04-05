import { User } from "@/GlopalTypes/userTypes";
import { Props } from "@/GlopalTypes/userTypes";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Chip,
  Grid,
} from "@mui/material";
import axios from "axios";

export default async function UserDetails({ params }: Props) {
  const { id } = await params;

  const res = await axios.get(`https://dummyjson.com/users/${id}`);
  const data: User = res.data;

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700}>
          User Details
        </Typography>
        <Typography color="text.secondary">
          Detailed information about the user
        </Typography>
      </Box>

      {/* Main Card */}
      <Card sx={{ borderRadius: 4, p: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            
            {/* Avatar */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  src={data.image}
                  sx={{ width: 120, height: 120 }}
                />
              </Box>
            </Grid>

            {/* Basic Info */}
            <Grid size={{ xs: 12, md: 9 }}>
              <Typography variant="h5" fontWeight={600}>
                {data.firstName} {data.lastName}
              </Typography>

              <Typography color="text.secondary" mb={2}>
                {data.email}
              </Typography>

              <Chip
                label={data.role}
                color={
                  data.role === "admin"
                    ? "error"
                    : data.role === "moderator"
                    ? "warning"
                    : "default"
                }
              />
            </Grid>
          </Grid>

          {/* Divider */}
          <Box my={3} borderBottom="1px solid" borderColor="divider" />

          {/* Details */}
          <Grid container spacing={2}>
            
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight={600}>Phone</Typography>
              <Typography color="text.secondary">
                {data.phone}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight={600}>Age</Typography>
              <Typography color="text.secondary">
                {data.age}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight={600}>Address</Typography>
              <Typography color="text.secondary">
                {data.address.address}, {data.address.city}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight={600}>Company</Typography>
              <Typography color="text.secondary">
                {data.company.name}
              </Typography>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}