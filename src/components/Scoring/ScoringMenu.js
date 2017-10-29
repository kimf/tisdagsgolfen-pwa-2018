import React from 'react';
import { arrayOf, shape, number, func } from 'prop-types';

const confirmCancel = cancelFunc => {
  Alert.alert(
    'Vill du verkligen avsluta rundan?',
    'Allt du matat in kommer raderas!',
    [
      { text: 'Cancel', onPress: () => null, style: 'cancel' },
      { text: 'OK', onPress: () => cancelFunc() },
    ],
    { cancelable: false },
  );
};

const ScoringMenu = ({
  onClose,
  onPreview,
  cancelRound,
  currentHole,
  holes,
  changeHole,
}) => (
  <View style={{ flex: 1 }}>
    <View style={styles.inner}>
      <TGText style={styles.text}>MENY</TGText>
      <View style={styles.buttonRow}>
        {holes.map(hole => (
          <TGText
            key={hole.number}
            style={[
              styles.holeButtonText,
              {
                color: currentHole === hole.number ? colors.white : colors.dark,
              },
            ]}
            onPress={() => changeHole(hole.number)}
            viewStyle={[
              styles.holeButton,
              {
                backgroundColor:
                  currentHole === hole.number ? colors.green : colors.lightGray,
              },
            ]}
          >
            {hole.number}
          </TGText>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
        }}
      >
        <RowButton
          backgroundColor={colors.red}
          onPress={() => confirmCancel(cancelRound)}
          title="AVBRYT RUNDA"
        />
        <RowButton
          backgroundColor={colors.green}
          onPress={onPreview}
          title="SPARA RUNDA"
        />
      </View>
    </View>
    <TopButton
      backgroundColor={colors.blue}
      title="STÄNG"
      onPress={() => onClose()}
    />
  </View>
);

ScoringMenu.propTypes = {
  onClose: func.isRequired,
  onPreview: func.isRequired,
  cancelRound: func.isRequired,
  currentHole: number.isRequired,
  holes: arrayOf(
    shape({
      number: number.isRequired,
    }).isRequired,
  ).isRequired,
  changeHole: func.isRequired,
};

export default ScoringMenu;
