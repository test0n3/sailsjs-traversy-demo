/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: (req, res) => {
    Articles.find().exec((err, articles) => {
      if (err) {
        res.send(500, { error: "Database error" });
      }
      res.view("pages/list", { articles: articles });
    });
  },

  add: (req, res) => {
    res.view("pages/add");
    console.log("Reach controller add");
  },

  create: (req, res) => {
    let title = req.body.title;
    let body = req.body.body;

    Articles.create({ title: title, body: body }).exec(err => {
      if (err) {
        res.send(500, { error: "Database error" });
      }
      res.redirect("/articles/list");
    });
  },

  delete: (req, res) => {
    Articles.destroy({ id: req.params.id }).exec(err => {
      if (err) {
        res.send(500, { error: "Database error" });
      }
      res.redirect("/articles/list");
    });
    console.log("Reach controller delete");
    return false;
  },

  edit: (req, res) => {
    Articles.findOne({ id: req.params.id }).exec((err, article) => {
      if (err) {
        res.send(500, { error: "Database error" });
      }
      res.view("pages/edit", { article: article });
    });
    console.log("Reach controller edit");
  },

  update: (req, res) => {
    let title = req.body.title;
    let body = req.body.body;

    Articles.update({ id: req.params.id }, { title: title, body: body }).exec(
      err => {
        if (err) {
          res.send(500, { error: "Database error" });
        }
        console.log("Reach controller update");
        res.redirect("/articles/list");
      }
    );
    return false;
  }
};
