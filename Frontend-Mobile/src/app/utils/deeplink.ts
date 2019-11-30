// import { Deeplinks } from '@ionic-native/deeplinks/ngx';


// export class Deeplink{

//     constructor(private deeplinks: Deeplinks) { }

//     this.deeplinks.route({
//         '/about-us': AboutPage,
//         '/universal-links-test': AboutPage,
//         '/products/:productId': ProductPage
//     }).subscribe(match => {
//         // match.$route - the route we matched, which is the matched entry from the arguments to route()
//         // match.$args - the args passed in the link
//         // match.$link - the full link data
//         console.log('Successfully matched route', match);
//     }, nomatch => {
//         // nomatch.$link - the full link data
//         console.error('Got a deeplink that didn\'t match', nomatch);
//     });

//     this.deeplinks.routeWithNavController(this.navController, {
//         '/about-us': AboutPage,
//         '/products/:productId': ProductPage
//     }).subscribe(match => {
//         // match.$route - the route we matched, which is the matched entry from the arguments to route()
//         // match.$args - the args passed in the link
//         // match.$link - the full link data
//         console.log('Successfully matched route', match);
//         }, nomatch => {
//         // nomatch.$link - the full link data
//         console.error('Got a deeplink that didn\'t match', nomatch);
//         });

// }