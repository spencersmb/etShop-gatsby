import React from 'react'
import { graphql } from 'gatsby'
import contentParser from 'gatsby-wpgraphql-inline-images'

const SupportItem = (props: any) => {
	const pluginOptions = {
		wordPressUrl: `${process.env.GATSBY_DB}`,
		uploadsUrl: `${process.env.GATSBY_DB}/wp-content/uploads/`
	}
	const {
		// location,
		pageContext: {
			content
		},
		data: {
			wpgraphql: { supportQuestion: { title } }
		}
	} = props
	console.log('support item props', props.data.wpgraphql.supportQuestion)

	return (
		<div>
			<h1 data-testid={'title'}>{title}</h1>
			<div data-testid={'content'}>
				{contentParser({ content }, pluginOptions)}
			</div>
		</div>
	)
}

export default SupportItem

export const pageQuery = graphql`
    query GET_POST($id: ID!) {
        wpgraphql {
            supportQuestion(id: $id) {
                title
                content
            }
        }
    }
`
// WP post example code
// function cptui_register_my_cpts_support_item() {
//
//   /**
//    * Post Type: Support Items.
//    */
//
//   $labels = [
//     "name" => __( "Support Items", "twentytwenty" ),
//     "singular_name" => __( "Support Item", "twentytwenty" ),
// ];
//
//   $args = [
//     "label" => __( "Support Items", "twentytwenty" ),
//     "labels" => $labels,
//     "description" => "",
//     "public" => true,
//     "publicly_queryable" => true,
//     "show_ui" => true,
//     "delete_with_user" => false,
//     "show_in_rest" => true,
//     "rest_base" => "",
//     "rest_controller_class" => "WP_REST_Posts_Controller",
//     "has_archive" => false,
//     "show_in_menu" => true,
//     "show_in_nav_menus" => true,
//     "delete_with_user" => false,
//     "exclude_from_search" => false,
//     "capability_type" => "post",
//     "map_meta_cap" => true,
//     "rewrite" => [ "slug" => "support_item", "with_front" => true ],
//   "query_var" => true,
//     "supports" => [ "title", "editor", "thumbnail" ],
//     'show_in_graphql' => true,
//     'hierarchical' => true,
//     'graphql_single_name' => 'Support',
//     'graphql_plural_name' => 'Supports',
// ];
//
//   register_post_type( "support_item", $args );
// }
//
// add_action( 'init', 'cptui_register_my_cpts_support_item' );
