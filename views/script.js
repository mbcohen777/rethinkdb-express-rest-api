fetch("/comments")
  .then((res) => res.json()).then((comments) => {
    console.log(comments);
  });