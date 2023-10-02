import { Grid, GridItem, Text } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Grid
      w="60%"
      h="full"
      templateAreas={`"nav content side"
                      "footer content side"`}
      gridTemplateRows="repeat(1fr, 3)"
      gridTemplateColumns="1fr 3fr 1fr"
      gap="4"
      pb="4"
      pt="2"
    >
      <GridItem area="nav">
        <Text>Nav</Text>
      </GridItem>
      <GridItem area="content">
        <Text>Content</Text>
      </GridItem>
      <GridItem area="side">
        <Text>Side</Text>
      </GridItem>
      <GridItem area="footer">
        <Text>Footer</Text>
      </GridItem>
    </Grid>
  );
}
