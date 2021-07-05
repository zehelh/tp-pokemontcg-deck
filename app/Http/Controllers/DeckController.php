<?php

namespace App\Http\Controllers;

use App\Http\Resources\DeckResource;
use App\Models\Deck;
use App\Models\DeckCard;
use Illuminate\Http\Request;

class DeckController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DeckResource::collection(Deck::paginate(20));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'=>'required',
        ]);

        $deck = Deck::create($data);

        return response()->json($deck);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $pokemon = new DeckResource(Deck::findOrFail($id));
        return response()->json($pokemon);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name'=>'required',
        ]);

        $deck = Deck::where('id', $id)->update($data);

        return response()->json($deck);
    }

    /**
     * get cards of deck
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getCardOfDeck($id)
    {
        return DeckCard::where('deck_id', $id)->get();
    }

    /**
     * setCardOfDeck => add card to deck
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function setCardOfDeck(Request $request)
    {

        $data = $request->validate([
            'name'=>'required',
            'deck_id'=>'required|exists:decks,id',
            'card_api_id'=>'required',
            'quantity'=>'required',
            'supertype'=>'required',
            'status'=>'required',
        ]);

        //  On verifie si l'assoc du deck et de la carte existe deja poru eviter tout erreur et s'assurer que par la suite on n'agit que sur cette meme association
        $exists = DeckCard::where('deck_id', $data['deck_id'])->where('card_api_id', $data['card_api_id'])->get();

        // On Patch le status
        Deck::where('id', $data['deck_id'])->update(['status' => $data['status']]);
        unset($data['status']);

        if($exists->isNotEmpty()){
            // Si oui, on incrémente simplement la quantité
            // Si la carte n'est pas une carte energy et que ca quantité est superieur ou egal a 0 on la refixe a 4 (le cas ou elle depasse 4 n'est pas censé ce produire)
            if($data['supertype'] != "Energy" && $exists[0]['quantity'] >= 4) {
                $qte = 4;
            } else {
                $qte = $exists[0]['quantity'] + 1;
            }
            DeckCard::where('deck_id', $data['deck_id'])->where('card_api_id', $data['card_api_id'])->update(['quantity' => $qte]);
        } else {
            // Si non, on ajoute la carte dans le deck
            DeckCard::create($data);
        }
    }

    /**
     * decrementCardOfDeck
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function decrementCardOfDeck(Request $request)
    {

        $data = $request->validate([
            'deck_id'=>'required|exists:decks,id',
            'card_api_id'=>'required',
        ]);

        //  On verifie si l'assoc du deck et de la carte existe deja poru eviter tout erreur et s'assurer que par la suite on n'agit que sur cette meme association
        $exists = DeckCard::where('deck_id', $data['deck_id'])->where('card_api_id', $data['card_api_id'])->get();

        // On Patch le status => si on decremente, le deck sera forcement incomplet
        Deck::where('id', $data['deck_id'])->update(['status' => 0]);

        if($exists->isNotEmpty()){
            $qte = $exists[0]['quantity'] - 1;
            if($exists[0]['quantity'] - 1 > 0) {
                DeckCard::where('deck_id', $data['deck_id'])->where('card_api_id', $data['card_api_id'])->update(['quantity' => $qte]);
            } elseif($qte = $exists[0]['quantity'] - 1 === 0) {
                DeckCard::where('deck_id', $data['deck_id'])->where('card_api_id', $data['card_api_id'])->delete();
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
