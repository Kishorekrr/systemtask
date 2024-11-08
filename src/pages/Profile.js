import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/actions/profileActions";
import AvatarImage from "../assets/AvatarImage.png";
import "../styles/Profile.css";

const Profile = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    userId: profile.userId,
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    profession: profile.profession,
    workLinks: {
      website: profile.workLinks?.website || "",
      linkedin: profile.workLinks?.linkedin || "",
      facebook: profile.workLinks?.facebook || "",
    },
    skills: profile.skills || [
      "Web Designer",
      "Web Developer",
      "React",
      "Html",
      "Css",
      "Javascript",
      "PHP",
      ".Net",
    ],
  });
  const [errors, setErrors] = useState({});

    useEffect(() => {
    setFormData({
      userId: profile.userId,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      profession: profile.profession,
      workLinks: {
        website: profile.workLinks?.website || "",
        linkedin: profile.workLinks?.linkedin || "",
        facebook: profile.workLinks?.facebook || "",
      },
      skills: profile.skills || [
        "Web Designer",
        "Web Developer",
        "React",
        "Html",
        "Css",
        "Javascript",
        "PHP",
        ".Net",
      ],
    });
  }, [profile]);

  
  const toggleModal = () => setModalOpen(!isModalOpen);
  
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.profession.trim())
      newErrors.profession = "Profession is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "skills") {
      setFormData((prevData) => ({
        ...prevData,
        skills: value.split(",").map((skill) => skill.trim()), 
      }));
    } else if (name.startsWith("workLinks.")) {
      const linkType = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        workLinks: {
          ...prevData.workLinks,
          [linkType]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateProfile(formData));
      toggleModal(); 
    }
  };

  return (
    <div className="ProfileContainer">
      <div className="ProfileCard">
        <div className="ProfileHeader">
          <img src={AvatarImage} alt="Profile" className="ProfilePhoto" />
          <h3>{formData.name}</h3>
          <p className="Profession">{formData.profession}</p>
          <span className="Ranking">RANKINGS: {profile.ranking || "8/10"}</span>
          <button className="EditProfileButton" onClick={toggleModal}>
            Edit Profile
          </button>
        </div>

        <div className="ProfileContent">
          <div className="ProfileDetails">
            <h4>About</h4>
            <p>User Id: {formData.userId}</p>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Phone: {formData.phone}</p>
            <p>Profession: {formData.profession}</p>
          </div>

          <div className="ProfileLinks">
            <h4>Work Links</h4>
            <a
              href={formData.workLinks.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website Link
            </a>
            <a
              href={formData.workLinks.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={formData.workLinks.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>

          <div className="ProfileSkills">
            <h4>Skills</h4>
            {formData.skills.map((skill, index) => (
              <p key={index}>{skill}</p>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="ModalOverlay">
          <div className="ModalContent">
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <label>User ID:</label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
              />

              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}

              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}

              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}

              <label>Profession:</label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
              />
              {errors.profession && (
                <span className="error">{errors.profession}</span>
              )}

              <h4>Skills</h4>
              <label>Skills (comma-separated):</label>
              <input
                type="text"
                name="skills"
                value={formData.skills.join(", ")}
                onChange={handleChange}
              />

              <button type="submit">Save Changes</button>
              <button type="button" onClick={toggleModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
