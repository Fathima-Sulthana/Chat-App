// routes/users.route.ts
import { Router } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";

const router = Router();

router.get("/users", async (req, res) => {
  try {
    const usersResponse = await clerkClient.users.getUserList();

    // Access the array of users
    const users = usersResponse.data;
    

    const userList = users.map((user: typeof users[0]) => ({
      id: user.id,
      username: user.username || "",
      fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      email: user.emailAddresses?.[0]?.emailAddress,
      profilePic: user.imageUrl,
    }));

  

    res.status(200).json(userList);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
