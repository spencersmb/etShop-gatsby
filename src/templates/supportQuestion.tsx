import Layout from '@components/layout'
import SEO from '@components/seo'
import SupportContent from '@components/support/supportPageContent'
import { createStandardJSONLD, facebookDefaultMeta, twitterDefaultMeta } from '@utils/socialUtils'
import React from 'react'
import { graphql } from 'gatsby'

const SupportQuestion = (props: any) => {
	const {
		pageContext: {
			content
		},
		data: {
			site,
			featureImage,
			wpgraphql: { supportQuestion: { title, slug, categories, id } }
		}
	} = props
	// console.log('support Question PAGE props', props.data.wpgraphql.supportQuestion)

	return (
		<>
			<SEO
				title={title}
				description={`${site.siteMetadata.description}`}
				keywords={[`gatsby`, `application`, `react`]}
				meta={[
					{
						property: `og:type`,
						content: `website`
					},
					...facebookDefaultMeta([
						{
							property: `og:title`,
							content: site.siteMetadata.title
						},
						{
							property: `og:description`,
							content: site.siteMetadata.description
						},
						{
							property: 'og:site_name',
							content: site.siteMetadata.title
						},
						{
							property: `og:url`,
							content: `${site.siteMetadata.siteUrl}`
						},
						{
							property: 'og:image',
							content: `${site.siteMetadata.siteUrl}${featureImage.childImageSharp.fluid.src}`
						},
						{
							property: 'og:image:secure_url',
							content: `${site.siteMetadata.siteUrl}${featureImage.childImageSharp.fluid.src}`
						},
						{
							property: 'og:image:alt',
							content: `${site.siteMetadata.title}`
						},
						{
							property: 'og:image:type',
							content: ' image/jpeg'
						},
						{
							property: 'og:image:width',
							content: '1024'
						},
						{
							property: 'og:image:height',
							content: '648'
						}
					]),
					...twitterDefaultMeta([
						{
							name: `twitter:card`,
							content: `summary_large_image`
						},
						{
							name: `twitter:title`,
							content: `${site.siteMetadata.title}`
						},
						{
							name: `twitter:description`,
							content: `${site.siteMetadata.description}`
						},
						{
							name: `twitter:image`,
							content: `${site.siteMetadata.siteUrl}${featureImage.childImageSharp.fluid.src}`
						}
					])
				]}
			>
				<link rel='canonical' href={`${site.siteMetadata.siteUrl}/${slug}`}/>
				<script type='application/ld+json'>{JSON.stringify(createStandardJSONLD({
					siteUrl: site.siteMetadata.siteUrl,
					featureImgSrc: featureImage.childImageSharp.fluid.src
				}))}
				</script>
			</SEO>
			<Layout whiteFooter={true}>
				<SupportContent {...{
					id,
					content,
					title,
					categories: categories.nodes
				}}/>
			</Layout>
		</>
	)
}

export default SupportQuestion

export const pageQuery = graphql`
    query GET_POST($id: ID!) {
        site {
            siteMetadata {
                title
                siteUrl
                description
                authorUrl
                frontEndUrl
            }
        }
        featureImage: file(relativePath: { eq: "color-palette.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1024) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        wpgraphql {
            supportQuestion(id: $id) {
                title
                content
                slug
                id
                categories{
                    nodes{
                        name
                        slug
                        supportQuestions{
                            nodes{
                                title
                                id
                                slug
                                excerpt
                                acfSupportQuestions{
                                    popularity
                                    subtitle
                                }
                            }
                        }
                    }
                }
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
