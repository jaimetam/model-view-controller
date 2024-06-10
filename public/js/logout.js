document.addEventListener("DOMContentLoaded", () => {
    const logoutLink = document.querySelector("#logout");
    if (logoutLink) {
        logoutLink.addEventListener("click", async (e) => {
            e.preventDefault();
            const response = await fetch("/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                document.location.replace('/main');
            } else {
                alert("----- Failed to log out. -----");
            }
        });
    }
});

// Comment