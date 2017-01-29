var self = require('./self');

module.exports = {

  'site_nav':  [
    {'text': 'about', 'link': '/about'},
    {'text': 'dynamic route', 'link': '/projects/cssmonster'}
  ],

  'social_nav': [
    {'text':  'Twitter', 'link': 'https://twitter.com/SeeBath', 'icon_name': 'twitter'},
    {'text':  'GitHub', 'link': 'https://github.com/cmajel', 'icon_name': 'github-circle'},
    {'text':  'CodePen', 'link': 'http://codepen.io/seebath/', 'icon_name': 'codepen'},
    {'text':  'LinkedIn', 'link': 'https://www.linkedin.com/in/christinebath', 'icon_name': 'linkedin'},
    {'text':  'Email', 'link': 'mailto:' + self.email, 'icon_name': 'email-outline'}
  ]

};