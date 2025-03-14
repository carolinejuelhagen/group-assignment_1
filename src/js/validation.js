class Validation {
    static validateForm(target, validationMessage) {
        validationMessage.style.display = "none";
        const fieldsToValidate = [];
        if (target === "students" || target === "instructor") {
            fieldsToValidate.push(
                { name: "firstName", message: "Please enter your first name"},
                { name: "lastName", message: "Please enter your last name"},
                { name: "email", message: "Please enter your email"},
                { name: "phone", message: "Please enter your phone number"}
            )
        } else if (target === "course") {
            fieldsToValidate.push(
                { name: "courseName", message: "Please enter course name"},
                { name: "courseCode", message: "Please enter course code"}
            );
        };

        for (let field of fieldsToValidate) {
            const inputField = document.querySelector(`[id = ${field.name}]`);
            inputField.addEventListener("input", () => {
                inputField.classList.remove("invalid-input");
            });

            if (!inputField.value.trim()) {
                validationMessage.style.display = "block";
                validationMessage.textContent = field.message;
                inputField.classList.add("invalid-input");
                return false;
            }

            if (field.name === "phone") {
                const validPhoneNumber = /^\d{8}$/;
                if (!validPhoneNumber.test(inputField.value)) {
                    validationMessage.style.display = "block";
                    validationMessage.textContent = "The phone number must consist of 8 digits";
                    inputField.classList.add("invalid-input");
                    return false;
                }
            }

            if (field.name === "email") {
                if (!inputField.value.includes("@")) {
                    validationMessage.style.display = "block";
                    validationMessage.textContent = "Email must contain '@'";
                    inputField.classList.add("invalid-input");
                    return false;
                }
            }
        }
        return true;
    };
};

export default Validation;